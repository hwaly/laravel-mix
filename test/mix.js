import test from 'ava';
import mix from '../src/index';
import sinon from 'sinon';

test('that it knows if its being executed in a production environment', t => {
    Config.production = true;

    t.true(Mix.inProduction());
});


test('that it can check if a certain config item is truthy', t => {
    Config.versioning = true;

    t.true(Mix.isUsing('versioning'));
});


test('that it knows if it should watch files for changes', t => {
    process.argv.push('--watch');

    t.true(Mix.isWatching());
});


test('that it can add a custom file to the webpack asset list', t => {
    Mix.addAsset('foo');

    t.is('foo', Config.customAssets[0]);
});


test('that it can dispatch events', t => {
    let callback = sinon.spy();

    Mix.listen('some-event', callback);
    Mix.dispatch('some-event');

    t.true(callback.called);
});
