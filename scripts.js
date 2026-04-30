// Escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

// Luces
const sun = new THREE.DirectionalLight(0xffffff, 2.5);
sun.position.set(0, 80, -20);
scene.add(sun);

const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4);
scene.add(hemi);

// Modelos 3D
let manoIzquierda, manoDerecha;

const proxyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: false
});

const loader = new THREE.GLTFLoader();

loader.load('assets/manos.glb', function (gltf) {
    const modeloOriginal = gltf.scene;
    modeloOriginal.traverse(hijo => {
        if (hijo.isMesh) hijo.material = proxyMaterial;
    });

    const initParams = getResponsiveParams();

    manoDerecha = modeloOriginal;
    manoDerecha.position.set(initParams.startOffset, 0, -15);
    manoDerecha.scale.set(-initParams.scale, initParams.scale, initParams.scale);
    scene.add(manoDerecha);

    manoIzquierda = modeloOriginal.clone();
    manoIzquierda.position.set(-initParams.startOffset, 0, -15);
    manoIzquierda.scale.set(initParams.scale, initParams.scale, initParams.scale);
    scene.add(manoIzquierda);
});

// Shader de umbral blanco/negro
const ThresholdShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "threshold": { value: 1 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float threshold;
        varying vec2 vUv;
        void main() {
            vec4 texel = texture2D( tDiffuse, vUv );
            float brightness = (texel.r + texel.g + texel.b) / 3.0;
            float v = step(threshold, brightness);
            float alphaFinal = texel.a > 0.1 ? 1.0 : 0.0;
            gl_FragColor = vec4(vec3(v), alphaFinal);
        }
    `
};

const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));
const thresholdPass = new THREE.ShaderPass(ThresholdShader);
composer.addPass(thresholdPass);

// Parámetros responsivos
function getResponsiveParams() {
    const w = window.innerWidth;

    if (w < 480) {
        return {
            scale: 0.05,
            destinoL: { x: -5, z: -8 },
            destinoR: { x: 5, z: -8 },
            startOffset: 15
        };
    } else if (w < 768) {
        return {
            scale: 0.06,
            destinoL: { x: -7, z: -8 },
            destinoR: { x: 7, z: -8 },
            startOffset: 20
        };
    } else if (w < 1024) {
        return {
            scale: 0.07,
            destinoL: { x: -8, z: -6 },
            destinoR: { x: 8, z: -6 },
            startOffset: 25
        };
    } else {
        return {
            scale: 0.09,
            destinoL: { x: -10, z: -5 },
            destinoR: { x: 10, z: -5 },
            startOffset: 30
        };
    }
}

const lerp = 0.05;
let currentParams = getResponsiveParams();

function animate() {
    requestAnimationFrame(animate);

    const params = currentParams;

    if (manoIzquierda && manoDerecha) {
        manoIzquierda.position.x += (params.destinoL.x - manoIzquierda.position.x) * lerp;
        manoDerecha.position.x += (params.destinoR.x - manoDerecha.position.x) * lerp;
        manoIzquierda.position.z += (params.destinoL.z - manoIzquierda.position.z) * lerp;
        manoDerecha.position.z += (params.destinoR.z - manoDerecha.position.z) * lerp;

        const time = performance.now() * 0.001;
        const floatY = Math.sin(time) * 0.15;
        manoIzquierda.position.y = floatY;
        manoDerecha.position.y = floatY;

        const tilt = Math.cos(time * 0.7) * 0.03;
        manoIzquierda.rotation.z = tilt;
        manoDerecha.rotation.z = -tilt;

        manoIzquierda.rotation.y = THREE.MathUtils.degToRad(15);
        manoDerecha.rotation.y = THREE.MathUtils.degToRad(-15);
    }

    composer.render();
}

animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    composer.setSize(window.innerWidth, window.innerHeight);

    currentParams = getResponsiveParams();
    const params = currentParams;
    if (manoIzquierda && manoDerecha) {
        manoIzquierda.scale.set(params.scale, params.scale, params.scale);
        manoDerecha.scale.set(-params.scale, params.scale, params.scale);
    }
});

// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');

    if (toggle && menuList) {
        toggle.addEventListener('click', () => {
            const isOpen = menuList.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        menuList.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                menuList.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
});