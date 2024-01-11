import { readFile } from 'fs/promises';

const data = JSON.parse(await readFile(new URL('./data/zoli.json', import.meta.url)));
const self = JSON.parse(await readFile(new URL('./data/self.json', import.meta.url)));

let bannersType= new Map()
let banners = new Set()
// stellar warp: 1001, departur warp: 4001,

Object.entries(self.data.stores["1_warp-v2"]).forEach(([key1, value1]) =>{
    Object.entries(value1).forEach(([key2, value2]) =>{
        if (value2.gachaId !== undefined){
            banners.add(key1)
            if (!bannersType.has(key1)) {
                bannersType.set(key1, [value2.gachaId])
            }else {
                let items = bannersType.get(key1)
                if (!items.includes(value2.gachaId)){
                    items.push(value2.gachaId)
                    bannersType.set(key1, items)
                }
            }
        }
    })
})
console.log(bannersType)
Object.entries(data.default.character).forEach(([key, value]) =>{
    let character = {
        "uid": `${value.id}`,
        "itemId": value.itemId,
        "timestamp": Date.parse(value.time),
        "gachaType": value.type === "character" ? 1 : 2,
        "gachaId": value.bannerCode,
        "rarity": value.rarity,
        "manual":false,
        "pity4":null,
        "pity5":null,
        "pullNo":null,
        "result":null,
        "anchorItemId":`${null}`,
        "sort":null
    }
    console.log(character)
    //characters.push()
})