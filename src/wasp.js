import * as THREE from 'three';
import TweenMax from 'gsap';

export default () => {

    const matOrange = new THREE.MeshPhongMaterial( {
        color: 0xf7be35, 
        shininess:0,
        flatShading : true, 
        side: THREE.DoubleSide
    });
    const matBlack = new THREE.MeshPhongMaterial({
        color: 0x202020, 
        shininess:0,
        flatShading : true, 
        side: THREE.DoubleSide
    });
    const matWhite = new THREE.MeshPhongMaterial({
        color: 0xfafafa,
        shininess:0,
        flatShading : true, 
        side: THREE.DoubleSide
    });

    const wasp = new THREE.Group();


    // LE CORPS
    const bodyGroup = new THREE.Group();

    const bodyRight = new THREE.Mesh( new THREE.CylinderGeometry( 9, 1, 10, 8 ), matOrange );
    bodyRight.rotation.z = Math.PI / 2;
    bodyRight.position.x = -5;

    const bodyCenter = new THREE.Mesh( new THREE.CylinderGeometry( 9, 9, 9, 8 ), matBlack );
    bodyCenter.rotation.z = Math.PI / 2;
    bodyCenter.position.x = -14.5;

    const bodyLeft = new THREE.Mesh( new THREE.CylinderGeometry( 1, 9, 10, 8 ), matOrange );
    bodyLeft.rotation.z = Math.PI / 2;
    bodyLeft.position.x = -24;

    bodyGroup.add(bodyRight);
    bodyGroup.add(bodyCenter);
    bodyGroup.add(bodyLeft);
    bodyGroup.rotation.z = 0.1;


    // LE DARD
    const dardGroup = new THREE.Group();

    const dardStart = new THREE.Mesh( new THREE.CylinderGeometry( 1, 9, 10, 8 ), matBlack );
    dardStart.rotation.z = Math.PI / 2;
    dardStart.position.x = 5;
    
    const dardCenter = new THREE.Mesh( new THREE.CylinderGeometry( 9, 12, 12, 8 ), matOrange );
    dardCenter.rotation.z = Math.PI / 2;
    dardCenter.position.x = 16;
    
    const dardCenter2 = new THREE.Mesh( new THREE.CylinderGeometry( 12, 11, 10, 8 ), matBlack );
    dardCenter2.rotation.z = Math.PI / 2;
    dardCenter2.position.x = 27;
    
    const dardCenter3 = new THREE.Mesh( new THREE.CylinderGeometry( 11, 9, 10, 8 ), matOrange );
    dardCenter3.rotation.z = Math.PI / 2;
    dardCenter3.position.x = 37;
    
    const dardEnd = new THREE.Mesh( new THREE.CylinderGeometry( 9, 0, 14, 8 ), matBlack );
    dardEnd.rotation.z = Math.PI / 2;
    dardEnd.position.x = 49;

    dardGroup.add(dardStart);
    dardGroup.add(dardCenter);
    dardGroup.add(dardCenter2);
    dardGroup.add(dardCenter3);
    dardGroup.add(dardEnd);
    dardGroup.rotation.z = -0.2;
    dardGroup.position.x = -6;


    // LA TETE DE LA BETE
    const headGroup = new THREE.Group();

    const geoHeadStart = new THREE.ConeGeometry( 8, 10, 8, 1);
    const headStart = new THREE.Mesh( geoHeadStart, matBlack );
    geoHeadStart.vertices[0].x += 4;
    geoHeadStart.computeVertexNormals();
    geoHeadStart.computeFaceNormals();
    geoHeadStart.__dirtyVertices = true;
    geoHeadStart.__dirtyNormals = true;
    headStart.rotation.z = -Math.PI / 2;
    headStart.rotation.x = Math.PI;
    headStart.position.x = -35;

    const headEnd = new THREE.Mesh(new THREE.SphereGeometry(8, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2), matBlack );
    headEnd.rotation.z = -Math.PI / 2;
    headEnd.rotation.y = Math.PI;
    headEnd.position.x = -40;

    headGroup.add(headStart);
    headGroup.add(headEnd);
    headGroup.position.x = 8;
    headGroup.position.y = -5;
    

    // LES ANTENNNNNES
    const antenne1 = new THREE.Group();
    const antenne2 = new THREE.Group();
    const geoBaseAntenne = new THREE.CylinderGeometry( 0.5, 0.5, 10, 32);
    const geoEndAntenne = new THREE.CylinderGeometry( 0.5, 0, 10, 32);

    // Antenne 1
    const a1Base = new THREE.Mesh( geoBaseAntenne, matBlack );
    a1Base.rotation.z = Math.PI / -2 - 0.3;
    
    const a1End = new THREE.Mesh( geoEndAntenne, matBlack );
    a1End.rotation.z = Math.PI / -2 + 0.3;
    a1End.position.x = -9.25;
    a1End.position.y = 0;

    antenne1.add(a1Base);
    antenne1.add(a1End);
    antenne1.position.x = -37;
    antenne1.position.y = -1;
    antenne1.position.z = -4;
    antenne1.rotation.x = -0.7;

    // Antenne 1
    const a2Base = new THREE.Mesh( geoBaseAntenne, matBlack );
    a2Base.rotation.z = Math.PI / -2 - 0.3;
    
    const a2End = new THREE.Mesh( geoEndAntenne, matBlack );
    a2End.rotation.z = Math.PI / -2 + 0.3;
    a2End.position.x = -9.25;
    a2End.position.y = 0;

    antenne2.add(a2Base);
    antenne2.add(a2End);
    antenne2.position.x = -37;
    antenne2.position.y = -1;
    antenne2.position.z = 4;
    antenne2.rotation.x = 0.7;


    // LES AILES
    const geoAileG = new THREE.CylinderBufferGeometry( 30, 3, 25, 8, 1, true, -0.4, 0.8 );
    geoAileG.translate( 0, 12.5, 0 );
    const aileG = new THREE.Mesh(geoAileG, matWhite);
    aileG.position.y = 4.5;
    aileG.position.x = -14;
    aileG.position.z = 3;
    
    const geoAileD = new THREE.CylinderBufferGeometry( 30, 3, 25, 8, 1, true, Math.PI - 0.4, 0.8 );
    geoAileD.translate( 0, 12.5, 0 );
    const aileD = new THREE.Mesh(geoAileD, matWhite);
    aileD.position.y = 4.5;
    aileD.position.x = -14;
    aileD.position.z = -3;
    
    wasp.add(bodyGroup);
    wasp.add(dardGroup);
    wasp.add(headGroup);
    wasp.add(antenne1);
    wasp.add(antenne2);
    wasp.add(aileG);
    wasp.add(aileD);


    wasp.traverse(m => {
        m.castShadow = true;
        m.receiveShadow = true;
    });


    let alive = true;
    const kill = () => {
        if(alive){
            swingAileD.pause();
            swingAileG.pause();
        }else{
            swingAileD.play();
            swingAileG.play();
        }
        alive = !alive;
    };

    const swingAileD = TweenMax.to(aileD.rotation, 0.05, {
        z: -3,
        yoyo: true,
        repeat: -1
    });

    const swingAileG = TweenMax.to(aileG.rotation, 0.05, {
        z: -3,
        yoyo: true,
        repeat: -1
    });

    return {wasp, kill};
};