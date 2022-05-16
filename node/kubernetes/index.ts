import * as path from "path"
import express from "express"
import * as bodyParser from "body-parser"
express.Router()

import {AccountDetails, AccountService, SignInRequest, WalletService} from "@trinsic/trinsic"

const app = express()
const port = process.env.PORT || 3000


const accountService = new AccountService()
const walletService = new WalletService()

let systemState = {
    userAccountString: "",
    userLoggedIn: false,
    walletEntries: ['']
}

async function searchWallet() {
    walletService.options.setAuthToken(systemState.userAccountString)
    const searchResponse = await walletService.search()
    systemState.walletEntries = searchResponse.getItemsList()
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
            res.render('login',systemState)
        else {
            await searchWallet();
            res.render('wallet', systemState)
        }
        // aWVu86LK7UVI8XEs8Gyh5k3iI
    })

    app.post('/login',async (req, res) => {
        systemState.userAccountString = await accountService.signIn(new SignInRequest().setDetails(new AccountDetails().setEmail(req.body.emailAddress)))
        res.render('login', systemState)
    })

    app.post('/verify_email', async(req, res) => {
        systemState.userAccountString = await AccountService.unprotect(systemState.userAccountString, req.body.unblindCode);
        systemState.userLoggedIn = true

        res.redirect('/');
    })

    app.post('/refresh', async(req, res) => {
        await searchWallet();
        res.redirect('/');
    })

    app.post('/issue_credential', async(req, res) => {
        console.log('TODO - Issue Credential')
        res.redirect('/');
    })

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
}

start()
