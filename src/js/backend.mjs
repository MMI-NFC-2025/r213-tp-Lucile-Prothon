import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('Maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return {};
    }
}

export async function getSurface(surface) {
    try {
        const data = await db.collection('Maison').getFullList({
            filter: `surface = ${surface}`,
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return {};
    }
}

export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        const data = await db.collection('Maison').getFullList({
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par prix', error);
        return [];
    }
}

export async function getAgents() {
    try {
        // récupérer tous les agents (liste complète)
        const data = await db.collection('Agent').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        const data = await db.collection('Agent').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant l agent', error);
        return {};
    }
}

export async function setFavori(house) {
    await db.collection('maison').update(house.id, { favori: !house.favori });
}