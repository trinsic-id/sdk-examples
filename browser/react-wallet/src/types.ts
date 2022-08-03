export type AppProps = { loggedIn: boolean; logout: Function; ecosystem?: { name: string | undefined; }; }
export type AppState = { authentication: { loggedIn: boolean; }; ecosystems: { currentEcosystem: any; }; }

export type ActionState = {
    wallet: any; (): any; new(): any; authentication: {
        user: { name: string, email: string }; challenge: Uint8Array; profile: any;
    };
}


export type EcosystemType = { ecosystemName?: string; description?: string; uri?: string; name?: string; email?: string; sms?: string; }


export type CredentialTemplatesStateType = { open: boolean, template: any }

export type OnChangeType = { target: { name: any; value: any; }; }
export type PreventDefaultType = {
    preventDefault(): void;
}