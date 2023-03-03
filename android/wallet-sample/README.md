# Trinsic SDK Android Samples

## Setup

1. To run the sample, you will need to download the necessary binaries. [Downloading necessary Binaries](https://github.com/trinsic-id/sdk-examples/blob/main/android/app/src/main/jniLibs/README.md)
2. You will need to set the following environment variables so that gradle can access the github maven package repository:
`GITHUB_ACTOR=[github user name]`
`GITHUB_TOKEN=[personal access token]`
They are used by the [`settings.gradle` file](https://github.com/trinsic-id/sdk-examples/blob/main/android/settings.gradle#L10-L11)

## Running the sample

You should be able to build and run inside android studio