package example

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/trinsic-id/sdk/go/proto/services/provider/v1/provider"
	"github.com/trinsic-id/sdk/go/proto/services/universalwallet/v1/wallet"
	"github.com/trinsic-id/sdk/go/services"
	"testing"
)

func makeTestEcosystem(tt *testing.T) (*services.Trinsic, *provider.CreateEcosystemResponse) {
	trinsic, err := services.NewTrinsic(services.WithTestEnv())
	assert.NoError(tt, err)

	eco, err := trinsic.Provider().CreateEcosystem(context.Background(), nil)
	assert.NoError(tt, err)

	return trinsic, eco
}

func createActors(t *testing.T, trinsic *services.Trinsic, ecoId string) map[string]string {
	actors := []string{"allison", "airline", "clinic"}
	ret := make(map[string]string)
	for _, a := range actors {
		actor, err := trinsic.Wallet().CreateWallet(context.Background(), &wallet.CreateWalletRequest{EcosystemId: ecoId})
		assert.NoError(t, err)
		ret[a] = actor.AuthToken
	}
	return ret
}

// Test here
func TestVaccineDemo(t *testing.T) {
	//var err error
	trinsic, eco := makeTestEcosystem(t)
	assert.NotNil(t, trinsic)

	actors := createActors(t, trinsic, eco.Ecosystem.Id)
	assert.Len(t, actors, 3)

	trinsic.SetAuthToken(actors["clinic"])
	info, err := trinsic.Wallet().GetMyInfo(context.Background(), &wallet.GetMyInfoRequest{})

	assert.NotNil(t, info)
	assert.Nil(t, err)
}
