import React from 'react'
import RockTile from './RockTile';

export default function Floor() {
    const tiles: JSX.Element[] = []

    const maxX = 5;
    const maxZ = 5;

    for (let x = 0; x < maxX; x++) {
        for (let z = 0; z < maxZ; z++) {
            tiles.push(<RockTile key={`${x}-${z}`} x={x} z={z} />);
        }
    }


    return <>
        {tiles}
    </>
}
