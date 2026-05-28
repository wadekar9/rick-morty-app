import { open } from '@op-engineering/op-sqlite';
import { ICharacter } from '$types/data.types';

const db = open({ name: 'rickmorty.sqlite' });

export const initDB = async () => {
    try {
        await db.execute('CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY, character TEXT)');
    } catch (error) {
        console.error('Failed to initialize database', error);
    }
};

export const getFavourites = async (): Promise<ICharacter[]> => {
    try {
        const { rows } = await db.execute('SELECT character FROM favourites');
        const chars: ICharacter[] = [];

        if (rows && rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                const row = typeof (rows as any).item === 'function' ? (rows as any).item(i) : (rows as any)[i];
                if (row && row.character) {
                    chars.push(JSON.parse(row.character));
                }
            }
        }
        return chars;
    } catch (error) {
        console.error('Failed to fetch favourites from DB', error);
        return [];
    }
};

export const addFavourite = async (character: ICharacter) => {
    try {
        await db.execute('INSERT OR REPLACE INTO favourites (id, character) VALUES (?, ?)', [
            character.id,
            JSON.stringify(character),
        ]);
    } catch (error) {
        console.error('Failed to add favourite', error);
        throw error;
    }
};

export const removeFavourite = async (id: number) => {
    try {
        await db.execute('DELETE FROM favourites WHERE id = ?', [id]);
    } catch (error) {
        console.error('Failed to remove favourite', error);
        throw error;
    }
};