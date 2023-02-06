import React, { useMemo } from 'react'
import { useGameState } from '../contexts/GameStateContext';
import RockTile from './BaseTile';
import PathTile from './PathTile';

export default function Floor() {
    const { gameState } = useGameState();
    const pathTiles = gameState.level.pathTiles;


    const tiles = useMemo(() => {
        const maxX = 5;
        const maxZ = 4;

        const _tiles: JSX.Element[] = []
        for (let x = 0; x < maxX; x++) {
            for (let z = 0; z < maxZ; z++) {
                const isPath = pathTiles.find((tile) => tile.x === x && tile.z === z);

                if (isPath) {
                    _tiles.push(<PathTile key={`${x}-${z}`} x={x} z={z} />);
                } else {
                    _tiles.push(<RockTile key={`${x}-${z}`} x={x} z={z} />);
                }
            }
        }
        return _tiles;
    }, [pathTiles])



    return <>
        {tiles}
    </>
}
