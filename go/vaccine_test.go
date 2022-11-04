package example

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/trinsic-id/sdk/go/proto/services/provider/v1/provider"
	"github.com/trinsic-id/sdk/go/services"
	"testing"
)

func makeTestEcosystem(tt *testing.T) (*services.Trinsic, *provider.CreateEcosystemResponse) {
	trinsic, err := services.NewTrinsic(services.WithTestEnv())
	assert.NoError(tt, err)

	provider := trinsic.Provider()
	assert.NoError(tt, err)

	eco, err := provider.CreateEcosystem(context.Background(), nil)
	assert.NoError(tt, err)

	return trinsic, eco
}

func createActors(t *testing.T, trinsic *services.Trinsic, ecoId string) map[string]string {
	actors := []string{"allison", "airline", "clinic"}
	ret := make(map[string]string)
	for _, a := range actors {
		actor, err := trinsic.Account().LoginAnonymous(context.Background(), ecoId)
		assert.NoError(t, err)
		ret[a] = actor
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
	info, err := trinsic.Account().GetInfo(context.Background())

	assert.NotNil(t, info)
	assert.Nil(t, err)
}
