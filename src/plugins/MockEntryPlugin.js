/**
 * Create a new plugin instance.
 */
function MockEntryPlugin() {}


/**
 * Apply the plugin.
 *
 * @param {Object} compiler
 */
MockEntryPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', stats => {
        // If no mix.js() call was requested, we'll also need
        // to delete the output script for the user. Since we
        // won't know the exact name, we'll hunt it down.
        let temporaryOutputFile = stats.toJson()
            .assets
            .find(asset => asset.chunkNames.includes('mix'));

        if (temporaryOutputFile) {
            File.find(
                path.resolve(Config.publicPath, temporaryOutputFile.name)
            ).delete();
        }

        delete stats.compilation.assets[temporaryOutputFile.name];
    });
};

module.exports = MockEntryPlugin;
