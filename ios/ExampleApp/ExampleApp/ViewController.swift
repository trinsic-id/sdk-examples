//
//  ViewController.swift
//  ExampleApp
//
//  Created by Tomislav Markovski on 12/1/21.
//

import UIKit
import Trinsic

class ViewController: UIViewController {
    
    let profileKeyName = "defaultTrinsicProfile"

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // create new account service instance
        let accountService = Services.Account()
            .build()
        
        var profile: AccountProfile? = nil
        
        // check if we have already have stored profile data in key chain
        if let data = KeyChain.load(key: profileKeyName) {
            profile = try! AccountProfile(serializedData: data)
        } else {
            // sign in to create new profile
            profile = try! accountService.loginAnonymous()
            
            // save profile in keychain
            _ = KeyChain.save(key: profileKeyName, data: try! profile!.serializedData())
        }
        
        // create new wallet service instance
        // and set authentication profile
        let walletService = Services.Wallet()
            .with(profile: profile!)
            .build()
        
        // list all items
        let items = try! walletService.search()
        
        print(items.debugDescription)
    }


}

