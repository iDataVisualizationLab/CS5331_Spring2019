importScripts("../lib/tsne.js");
onmessage = function(e){
    const opt = {}
    opt.epsilon = 1; // epsilon is learning rate (10 = default)
    opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
    opt.dim = 2; // dimensionality of the embedding (2 = default)

    const tsne = new tsnejs.tSNE(opt); // create a tSNE instance

    tsne.initDataRaw(e.data);

    for(var k = 0; k < 2000; k++) {
        tsne.step(); // every time you call this, solution gets better
        if(k%10==0){
            postMessage(tsne.getSolution());
        }
    }
}