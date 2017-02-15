
const pgrid = document.querySelector('.photos .grid');
const therm = document.querySelector('.therm video');

const colors = [];
const shapes = [];

let ticking;
let sy = 0;

/**
 * Heptagon paths
 */

const HEPTAGON = `
  37.5, 0
  42.931729, 2.61578283
  47.0509174, 4.59947941
  50.933175, 6.46907611
  55.002586, 8.4288012
  57.7127272, 9.73393641
  60.9166106, 11.2768453
  66.8186806, 14.1191324
  67.9221704, 18.9538371
  68.8129184, 22.8564591
  69.6608705, 26.5715799
  70.3473052, 29.5790469
  71.0938483, 32.8498659
  72.0927075, 37.2261542
  74.0597967, 45.844535
  71.1248035, 49.5249001
  68.6954022, 52.571273
  66.1441588, 55.770431
  63.8759845, 58.6146316
  62.0874471, 60.8573866
  59.8473159, 63.6664223
  56.8170495, 67.4662561
  53.7706402, 71.2863325
  49.8417969, 71.2863325
  45.5927734, 71.2863325
  42.2714844, 71.2863325
  37.9140625, 71.2863325
  32.8984375, 71.2863325
  28.0410156, 71.2863325
  21.2293598, 71.2863325
  17.9748087, 67.2052546
  15.3970205, 63.9728105
  12.807748, 60.7259654
  10.2116969, 57.4706203
  7.97339186, 54.6638745
  5.00596227, 50.9428355
  0.940203293, 45.844535
  2.31061044, 39.840389
  3.27718701, 35.6055404
  4.1393729, 31.8280572
  5.206326, 27.1534302
  6.1863964, 22.8594612
  6.98400823, 19.3648954
  8.18131941, 14.1191324
  12.0149614, 12.2729478
  16.4554217, 10.1345348
  21.0191472, 7.9367604
  25.0745138, 5.9837988
  28.3254617, 4.41822478
  31.7419533, 2.77292916
`;

/**
 * Rhombus paths
 */

const RHOMBUS = `
  10.3553391, 10.3553391
  16.0689088, 10.3553391
  19.7294294, 10.3553391
  23.7656004, 10.3553391
  27.3584486, 10.3553391
  31.2033417, 10.3553391
  35.5302276, 10.3553391
  39.2390855, 10.3553391
  42.695208, 10.3553391
  46.457237, 10.3553391
  50.1108523, 10.3553391
  54.3838764, 10.3553391
  60.3553391, 10.3553391
  60.3553391, 14.8029766
  60.3553391, 18.602985
  60.3553391, 21.8678296
  60.3553391, 26.9681135
  60.3553391, 31.2031583
  60.3553391, 34.6371837
  60.3553391, 38.0435878
  60.3553391, 42.0914979
  60.3553391, 45.2493097
  60.3553391, 48.8145366
  60.3553391, 52.1290996
  60.3553391, 56.4407937
  60.3553391, 60.3553391
  56.0660172, 60.3553391
  52.6326823, 60.3553391
  48.1628559, 60.3553391
  45.083765, 60.3553391
  41.1035272, 60.3553391
  37.0873817, 60.3553391
  33.5684206, 60.3553391
  29.4839122, 60.3553391
  25.1950057, 60.3553391
  22.0171684, 60.3553391
  18.3725301, 60.3553391
  14.7071758, 60.3553391
  10.3553391, 60.3553391
  10.3553391, 55.3621797
  10.3553391, 50.8702562
  10.3553391, 46.321709
  10.3553391, 41.8118316
  10.3553391, 37.6852007
  10.3553391, 33.4294398
  10.3553391, 29.4678465
  10.3553391, 25.7410347
  10.3553391, 21.7594158
  10.3553391, 17.1797945
  10.3553391, 13.5938517
`;

/**
 * Circle paths
 */

const CIRCLE = `
  37.5, 0
  42.1999963, 0.295698701
  46.8258708, 1.17813146
  51.3046707, 2.63338178
  55.5657628, 4.6384995
  59.541947, 7.16186271
  63.1705165, 10.1636765
  66.3942466, 13.5966004
  69.1622972, 17.4064952
  71.4310145, 21.5332766
  73.1646194, 25.9118627
  74.3357719, 30.4732007
  74.9260023, 35.1453555
  74.9260023, 39.8546445
  74.3357719, 44.5267993
  73.1646194, 49.0881373
  71.4310145, 53.4667234
  69.1622972, 57.5935048
  66.3942466, 61.4033996
  63.1705165, 64.8363235
  59.541947, 67.8381373
  55.5657628, 70.3615005
  51.3046707, 72.3666182
  46.8258708, 73.8218685
  42.1999963, 74.7043013
  37.5, 75
  32.8000037, 74.7043013
  28.1741292, 73.8218685
  23.6953293, 72.3666182
  19.4342372, 70.3615005
  15.458053, 67.8381373
  11.8294835, 64.8363235
  8.6057534, 61.4033996
  5.83770279, 57.5935048
  3.56898553, 53.4667234
  1.83538064, 49.0881373
  0.664228098, 44.5267993
  0.0739976839, 39.8546445
  0.0739976839, 35.1453555
  0.664228098, 30.4732007
  1.83538064, 25.9118627
  3.56898553, 21.5332766
  5.83770279, 17.4064952
  8.6057534, 13.5966004
  11.8294835, 10.1636765
  15.458053, 7.16186271
  19.4342372, 4.6384995
  23.6953293, 2.63338178
  28.1741292, 1.17813146
  32.8000037, 0.295698701
`;

/**
 * Triangle paths
 */

const TRIANGLE = `
  37.5, 0
  40.5298828, 6.05976562
  43.2365234, 11.4730469
  45.3210938, 15.6421875
  47.5632813, 20.1265625
  49.8076172, 24.6152344
  51.9640625, 28.928125
  53.9492188, 32.8984375
  56.4828125, 37.965625
  58.7273437, 42.4546875
  61.0966797, 47.1933594
  63.1935547, 51.3871094
  65.2542969, 55.5085937
  68.0753906, 61.1507813
  70.6789062, 66.3578125
  73.4771484, 71.9542969
  75, 75
  66.2773438, 75
  62.2519531, 75
  58.8476562, 75
  54.4326172, 75
  50.6865234, 75
  46.2568359, 75
  41.5263672, 75
  37.5351562, 75
  33.4267578, 75
  29.0996094, 75
  24.3828125, 75
  20.7119141, 75
  15.4951172, 75
  11.4550781, 75
  8.05078125, 75
  4.15527344, 75
  0, 75
  3.17714844, 68.6457031
  6.3453125, 62.309375
  9.12167969, 56.7566406
  11.9248047, 51.1503906
  13.8767578, 47.2464844
  15.1257813, 44.7484375
  16.6458984, 41.7082031
  18.1443359, 38.7113281
  20.9392578, 33.1214844
  23.3679688, 28.2640625
  26.1214844, 22.7570313
  28.3259766, 18.3480469
  29.6496094, 15.7007813
  31.2220703, 12.5558594
  33.5828125, 7.834375
  35.6871094, 3.62578125
`;

/**
 * Colors
 */

const hexes = [
  '#00CD94',
  '#EFEFEF',
  '#FFEE6A',
  '#F43837',
  '#A3FFFF',
  '#CC86FF',
  '#8FFF86',
  '#003BFF',
  '#FF58D2',
  '#C3FFF8',
  '#A4CEBC',
  '#9595FF',
  '#FFB695',
  '#0E0E0E',
];

/**
 * Coordinates
 */

const shapesXY = [
  ['38%', '-13%'],
  ['-2%', '15%'],
  ['-4%', '73%'],
  ['24%', '32%'],
  ['49%', '107%'],
  ['60%', '67%'],
  ['80%', '27%'],
  ['-10%', '-30%'],
  ['50%', '-50%'],
  ['-5%', '120%'],
  ['75%', '135%'],
  ['95%', '-20%'],
  ['108%', '110%'],
];


/**
 * Regenerate shape loop
 *
 * @param {Object} ctx
 * @api public
 */

const regAfterTime = ctx => {
  let wait = Math.random() * (15000 - 300) + 300;
  let loop = () => setTimeout(() => {
    wait = Math.random() * (15000 - 3000) + 1000;
    const {tp,tf,tx,tr} = randShape();
    morph(ctx, tp, tf, tx, tr);
    loop();
  }, wait);
  loop();
};

/**
 * Transform
 *
 * @param {Node} n
 * @param {Object} args
 * @api public
 */

const transform = (n, args) => {
  const tfm = [];

  Object.keys(n.__transform||{}).forEach(key => {
    if(args.hasOwnProperty(key)) return;
    args[key] = n.__transform[key];
  });

  const obj = {
    translate3d: args.translate3d,
    rotate: args.rotate,
    scale: args.scale,
  };

  Object.keys(obj).forEach(key => {
    if('undefined' == typeof obj[key]) return;
    tfm.push(`${key}(${obj[key]})`);
  });

  const v = tfm.join(' ');

  n.style.webkitTransform = v;
  n.style.MozTransform = v;
  n.style.msTransform = v;
  n.style.transform = v;
  n.__transform = obj;
};

/**
 * Morph shape
 *
 * @param {Object} context
 * @param {String} tp
 * @param {String} tf
 * @param {String} tx
 * @param {Float} ts
 * @param {Float} tr
 * @api public
 */

const morph = ({s,p,f,j}, tp, tf, ts, tr) => {
  const cp = p.getAttribute('to') || j.getAttribute('points');
  const cf = f.getAttribute('to') || j.getAttribute('fill');

  const i = colors.indexOf(cf);
  colors.splice(i, 1);

  j.setAttribute('points', cp);
  j.setAttribute('fill', cf);
  p.setAttribute('to', tp);
  f.setAttribute('to', tf);
  p.beginElement();
  f.beginElement();
  transform(s, {
    rotate: `${tr}deg`,
    scale: ts,
  });
};

/**
 * Random shape
 */

const randShape = () => {
  let pa = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3];
  let rc = hexes.filter(c => -1 == colors.indexOf(c));
  let tf = rc[~~(Math.random()*rc.length)];
  let pi = pa[~~(Math.random()*pa.length)];
  let pb = ~~(Math.random() * 3);
  let tr = Math.random() * 360;
  let tp;
  let tx;

  colors.push(tf);

  switch(pi) {
  case 0:
    tx = Math.random() * (1.2-.5) + .5;
    tp = CIRCLE;
    break;
  case 1:
    tx = Math.random() * (1.2-.5) + .5;
    tp = HEPTAGON;
    break;
  case 2:
    tx = Math.random() * (.8-.5) + .5;
    tp = RHOMBUS;
    break;
  case 3:
    tx = Math.random() * (.8-.5) + .5;
    tp = TRIANGLE;
    break;
  }

  if(pb != 1) tx /= 1.5;

  return {
    tp,
    tf,
    tx,
    tr,
  };
};

/**
 * Generate shapes
 */

shapesXY.some(([y,x]) => {
  if('/' != location.pathname) return true;
  const u = 'http://www.w3.org/2000/svg';
  const s = document.createElementNS(u, 'svg');
  const p = document.createElementNS(u, 'animate');
  const f = document.createElementNS(u, 'animate');
  const j = document.createElementNS(u, 'polygon');
  const k = [.1,.1,.2,.2,.3,.6,.15,.29];
  const v = k[~~(Math.random()*k.length)];
  const {tp,tf,tx,tr} = randShape();
  p.setAttribute('attributeName', 'points');
  f.setAttribute('attributeName', 'fill');
  p.setAttribute('calcMode', 'spline');
  f.setAttribute('calcMode', 'spline');
  p.setAttribute('dur', '1000ms');
  f.setAttribute('dur', '1000ms');
  p.setAttribute('keySplines', '.03,.98,.52,.99');
  f.setAttribute('keySplines', '.03,.98,.52,.99');
  p.setAttribute('keyTimes', '0;1');
  f.setAttribute('keyTimes', '0;1');
  p.setAttribute('begin', 'indefinite');
  f.setAttribute('begin', 'indefinite');
  p.setAttribute('fill', 'freeze');
  f.setAttribute('fill', 'freeze');
  s.setAttribute('viewbox', '0 0 75 75');
  s.setAttribute('height', 75);
  s.setAttribute('width', 75);
  s.style.transition = 'all 1s cubic-bezier(.03,.98,.52,.99)';
  s.style.position = 'absolute';
  s.style.zIndex = '-1';
  s.style.left = `${x}`;
  s.style.top = `${y}`;
  j.setAttribute('points', tp);
  j.setAttribute('fill', tf);
  regAfterTime({s,p,f,j});
  pgrid.appendChild(s);
  shapes.push({s,x,y,v});
  s.appendChild(j);
  j.appendChild(p);
  j.appendChild(f);
  transform(s, {
    rotate: `${tr}deg`,
    scale: tx,
  });
  return false;
});

/**
 * Move shapes
 *
 * @api public
 */

const moveShapes = () => {
  shapes.forEach(({s,v}) => transform(s, {
    translate3d: `0,-${sy*v}px,0`,
  }));
  ticking = false;
};

/**
 * Tick
 */

const tick = () => {
  if(ticking) return;
  requestAnimationFrame(moveShapes);
  ticking = true;
};

/**
 * Scrolling
 */

onscroll = () => {
  sy = scrollY;
  tick();
};

/**
 * Loop therm
 */

therm.onended = () => {
  setTimeout(() => {
    therm.play();
  }, 2000);
};

