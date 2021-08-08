import { FilterBy } from "../models/filter-by"
import { Flight } from "../models/flight"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    makeId
}

interface Entity {
    id?: string
}

async function query(entityType: string, filterBy: FilterBy = null, delay = 0): Promise<Entity[]> {
    var entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
    console.log('query in storage service');

    if (filterBy) {
        entities = _filter(entities, filterBy)
    }
    console.log('flights', entities);

    if (delay) {
        return new Promise((resolve) => setTimeout(resolve, delay, entities))
    }
    return entities
}

async function get(entityType: string, entityId: string): Promise<Entity> {
    const entities = await query(entityType)
    const entity = entities.find(entity => entity.id === entityId)
    if (!entity) throw new Error(`Cannot get, Item ${entityId} of type: ${entityType} does not exist`)
    return entity;
}

async function post(entityType: string, newEntity: Entity): Promise<Entity> {
    newEntity = { ...newEntity, id: makeId() }
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType: string, updatedEntity: Entity): Promise<Entity> {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
    entities[idx] = updatedEntity
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType: string, entityId: string): Promise<boolean> {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === entityId)
    if (idx !== -1) entities.splice(idx, 1)
    else throw new Error(`Cannot remove, item ${entityId} of type: ${entityType} does not exist`)
    _save(entityType, entities)
    return true;
}


function _save(entityType: string, entities: Entity[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _filter(entities: Flight[], filterBy: FilterBy) {
    console.log('filterby', filterBy, entities);

    if (filterBy.origin) {
        console.log('origin');
        entities = entities.filter(entity => entity.origin.toLocaleLowerCase().includes(filterBy.origin))
    }
    if (filterBy.destination) {
        console.log('destination');
        entities = entities.filter(entity => entity.destination.toLocaleLowerCase().includes(filterBy.destination))
    }
    if (filterBy.connections) {
        if (filterBy.connections !== 'all') {
            console.log('connections');
            if (filterBy.connections === '0') {
                entities = entities.filter(entity => !entity.connections.length)
            } else if (filterBy.connections === '1') {
                entities = entities.filter(entity => entity.connections.length - 1 === 1)
            } else {
                entities = entities.filter(entity => entity.connections.length - 1 > 1)
            }
        }
    }
    if (filterBy.minPrice) {
        entities = entities.filter(entity => entity.price >= filterBy.minPrice)
    }
    if (filterBy.maxPrice) {
        entities = entities.filter(entity => entity.price <= filterBy.maxPrice)
    }
    if (filterBy.fromDate || filterBy.toDate) {
        var startDate = new Date(filterBy.fromDate);
        var endDate = new Date(filterBy.toDate);
        entities = entities.filter(entity => {
            if (new Date(entity.departure).getTime() >= startDate.getTime() &&
                new Date(entity.departure).getTime() <= endDate.getTime() + 86400000) {
                return true
            }
            return false
        })
    }
    if (filterBy.sortBy) {
        if (filterBy.sortBy === 'fastest') {
            entities.sort((a, b) => {
                return (a.landing - a.departure) - (b.landing - b.departure)
            })
        }
        if(filterBy.sortBy === 'connections'){
            entities.sort((a,b) =>{
                return a.connections.length - b.connections.length
            })
        }
    }
    return entities

}