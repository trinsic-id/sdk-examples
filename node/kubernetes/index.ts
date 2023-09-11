import * as path from "path"
import express from "express"
import * as bodyParser from "body-parser"
express.Router()

import {
    LoginResponse, TrinsicService
} from "@trinsic/trinsic"

const app = express()
const port = process.env.PORT || 3000

const trinsic = new TrinsicService()

let systemState = {
    loginResponse: LoginResponse.fromPartial({}),
    userAccountString: "",
    userLoggedIn: false,
    walletEntries: ['']
}

async function searchWallet() {
    trinsic.options.authToken = systemState.userAccountString
    const searchResponse = await trinsic.wallet().search({ query: "SELECT * FROM _" })
    systemState.walletEntries = searchResponse.items!
    // TODO - Order by newest?
}

async function start() {
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json());

    app.get('/', async (req, res) => {
        if (!systemState.userLoggedIn)
            res.render('login', systemState)
        else {
            await searchWallet();
            res.render('wallet', systemState)
        }
        // aWVu86LK7UVI8XEs8Gyh5k3iI
    })

    app.post('/login', async (req, res) => {
        systemState.userAccountString = req.body.emailAddress;
        systemState.loginResponse = await trinsic.account().login({ email: req.body.emailAddress, ecosystemId: "default" });
        res.render('login', systemState)
    })

    app.post('/verify_email', async (req, res) => {
        // for @trinsic/trinsic 1.4.0 - throws RST_STREAM_ERROR code 0
        // const profile = await accountService.unprotect(AccountProfile.deserializeBinary(toUint8Array(systemState.userAccountString)), req.body.unblindCode)
        // systemState.userAccountString = fromUint8Array(profile.serializeBinary(), true);

        // for @trinsic/trinsic 1.4.2 - does not throw!
        systemState.userAccountString = await trinsic.account().loginConfirm(systemState.loginResponse.challenge, req.body.unblindCode);
        systemState.userLoggedIn = true

        res.redirect('/');
    })

    app.post('/refresh', async (req, res) => {
        await searchWallet();
        res.redirect('/');
    })

    app.post('/issue_credential', async (req, res) => {
        console.log('TODO - Issue Credential')
        res.redirect('/');
    })

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
}

start()
