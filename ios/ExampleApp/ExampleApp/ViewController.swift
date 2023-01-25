//
//  ViewController.swift
//  ExampleApp
//

import UIKit
import Trinsic

class ViewController: UIViewController {
    
    let profileKeyName = "defaultTrinsicProfile"

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let trinsicService = TrinsicService();
        
        var authToken: String = "";
        
        // check if we have already have stored profile data in key chain
        if let data = KeyChain.load(key: profileKeyName) {
            authToken = String(decoding: data, as: UTF8.self)
        } else {
            // sign in to create new profile
            authToken = try! trinsicService.account().loginAnonymous()
            // save profile in keychain
            _ = KeyChain.save(key: profileKeyName, data: authToken.data(using: .utf8)!)
        }
        
        trinsicService.options.authToken = authToken;
        
        // list all items
        let items = try! trinsicService.wallet().search()
        
        print(items.debugDescription)
    }
}
