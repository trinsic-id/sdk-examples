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
        let trinsicService = TrinsicService()
        
        var profile: String? = nil
        
        // check if we have already have stored profile data in key chain
        if let data = KeyChain.load(key: profileKeyName) {
            profile = String(data: data, encoding: .utf8)
        } else {
            // sign in to create new profile
            profile = try! trinsicService.account().loginAnonymous()
            
            // save profile in keychain
            _ = KeyChain.save(key: profileKeyName, data: profile!.data(using: .utf8)!)
        }
        
        trinsicService.options.authToken = profile!
        
        // create new wallet service instance
        // and set authentication profile
        let walletService = trinsicService.wallet();
        
        // list all items
        let items = try! walletService.search()
        
        print(items.debugDescription)
    }


}

