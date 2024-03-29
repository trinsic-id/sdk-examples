//
//  ContentView.swift
//  Shared
//
//  Created by Tomislav Markovski on 9/4/22.
//

import SwiftUI
import AppAuth

struct ContentView: View {
    var body: some View {
        VStack {
        Text("Hello, world!")
            .padding()
            Button("Share Credential", action: {
                
                guard let issuer = URL(string: "https://connect.trinsic.cloud") else {
                    print("Error creating URL")
                    return
                }
                
                guard let appDelegate = AppDelegate.instance else {
                    print("Error accessing AppDelegate")
                    return
                }
                
                OIDAuthorizationService.discoverConfiguration(forIssuer: issuer) { configuration, error in
                    
                    print(configuration.debugDescription)
                    
                    guard let redirectURI = URL(string: "swiftverifier://callback") else {
                        print("Error creating URL")
                        return
                    }
                    
                    guard let configuration = configuration else {
                        print("Error creating URL")
                        return
                    }
                    
                    let request = OIDAuthorizationRequest(configuration: configuration,
                                                          clientId: "did:example.com",
                                                          clientSecret: nil,
                                                          scopes: [OIDScopeOpenID],
                                                          redirectURL: redirectURI,
                                                          responseType: OIDResponseTypeCode,
                                                          additionalParameters: [
                                                            "trinsic:ecosystem": "default",
                                                            "trinsic:schema": "https://schema.trinsic.cloud/default/attendance-badge"
                                                          ])
                    
                    
                    let controller = UIApplication.shared.windows.filter {$0.isKeyWindow}.first!.rootViewController!
                    
                    appDelegate.currentAuthorizationFlow = OIDAuthorizationService.present(request, presenting: controller) { (response, error) in

                        if let response = response {
                            let authState = OIDAuthState(authorizationResponse: response)
                            
                            let tokenRequest = authState.lastAuthorizationResponse.tokenExchangeRequest()!
                            
                            OIDAuthorizationService.perform(tokenRequest) { response, error in
                                if let tokenResponse = response {
                                    print("Received token response with accessToken: \(tokenResponse.accessToken ?? "DEFAULT_TOKEN")")
                                } else {
                                    print("Token exchange error: \(error?.localizedDescription ?? "DEFAULT_ERROR")")
                                }
                                authState.update(with: response, error: error)
                            }
                            
                            print(authState.debugDescription)
                            //self.setAuthState(authState)
                            print("Authorization response with code: \(response.authorizationCode ?? "DEFAULT_CODE")")
                            // could just call [self tokenExchange:nil] directly, but will let the user initiate it.
                        } else {
                            print("Authorization error: \(error?.localizedDescription ?? "DEFAULT_ERROR")")
                        }
                    }
                }
                
            })
            .padding()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
