// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// module.exports = getDefaultConfig(__dirname);
module.exports = {
    resolver: {
        extraNodeModules: require('node-libs-react-native'),
    },
};