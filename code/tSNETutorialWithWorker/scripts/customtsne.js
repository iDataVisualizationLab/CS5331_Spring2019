let num_points = undefined;
//<editor-fold desc="utilities">
const sqrt = Math.sqrt;
/***
 * Calculate Eclidean distance between two points
 * @param x1
 * @param x2
 * @returns {*}
 */
const calc_distance = (x1, x2) => sqrt(x1.reduce(
    (sum, x1_i, i) => sum + squared(x1_i - x2[i]),
    0
));

/**
 * Maxtrix indices to array index.
 * @param i
 * @param j
 * @returns {*}
 */
const mat_ind = (i, j, num_points) => i * num_points + j;
/**
 * Squared of a value
 * @param val
 * @returns {number}
 */
const squared = (val) => Math.pow(val, 2);

/**
 * Make an array of n elements.
 * @param n
 * @returns {any[]}
 */
const make_array = (n) => [...(new Array(n))]

const log = Math.log;
const exp = Math.exp;
/**
 * Calculate gaussian probability
 * @param distances
 * @param variance
 * @returns {*}
 */
function calc_gaussian_probs(distances, variance){
    let sum_probs = 0;

    // calc un-normalized probs and accumulate sum of probs for normalization
    return distances.map( (dist, i) => {
        const curr_prob = dist !== 0 ? gaussian_prob(dist, variance): 0;
        sum_probs += curr_prob; // accumulate the sums
        return curr_prob;       // send probability to our array
    }).map(p => p/sum_probs)  // return the prob vector after normalizing it using sum.
}

/**
 * Calculate gaussian probability
 * @param distance
 * @param variance
 * @returns {*}
 */
function gaussian_prob(distance, variance){
    return exp(-squared(distance) / (2*variance))
}

/**
 * Calculate pairwise distance from the data
 * @param data
 * @returns {any[]}
 */
function pairwise_distances(data) {
    // initialize some variables we use inside our loops
    let x_i, x_j, distance;
    const num_points = data.length;
    // make_array is another helper function that just generates a new empty array of a given size.
    const pw_dists = make_array(squared(num_points));
    for (let i = 0; i < num_points; i++) {
        x_i = data[i];
        // deal with the point itself here.
        pw_dists[mat_ind(i, i, num_points)] = {'source': i, 'target': i, 'distance': 0};
        for (let j = i + 1; j < num_points; j++) {
            x_j = data[j];
            distance = calc_distance(x_i, x_j);
            pw_dists[mat_ind(i, j, num_points)] = {'source': i, 'target': j, 'distance': distance};
            pw_dists[mat_ind(j, i, num_points)] = {'source': j, 'target': i, 'distance': distance};
        }
    }
    return pw_dists
}

function calc_entropy(probs){
    return probs.reduce((sum, p)=>sum - (p>1e-7?p*log(p): 0), 0)//Super small probability can be ignored
}
//</editor-fold>