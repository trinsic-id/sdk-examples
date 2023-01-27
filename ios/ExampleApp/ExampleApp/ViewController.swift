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
            authToken = try! trinsicService.account().loginAnonymous(ecosystemId: "default")
            // save profile in keychain
            _ = KeyChain.save(key: profileKeyName, data: authToken.data(using: .utf8)!)
        }
        
        trinsicService.options.authToken = authToken;
        
        // list all items
        var searchRequest = Services_Universalwallet_V1_SearchRequest()
        let items = try! trinsicService.wallet().searchWallet(request: searchRequest)
        
        print(items.debugDescription)
    }
}
