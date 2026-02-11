import { useState, useEffect } from 'react'
import { saveCollectionData, getCollectionData, saveToCollection, getFromCollection, deleteFromCollection } from '../firebaseService'

export const useFirebaseCollection = (collectionName, initialData = []) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [collectionName])

  const loadData = async () => {
    const result = await getCollectionData(collectionName)
    if (result) {
      setData(result)
    }
    setLoading(false)
  }

  const saveData = async (newData) => {
    setData(newData)
    await saveCollectionData(collectionName, newData)
  }

  return { data, setData: saveData, loading, reload: loadData }
}

export const useFirebaseItems = (collectionName) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [collectionName])

  const loadItems = async () => {
    const result = await getFromCollection(collectionName)
    setItems(result)
    setLoading(false)
  }

  const addItem = async (item) => {
    await saveToCollection(collectionName, item)
    loadItems()
  }

  const removeItem = async (id) => {
    await deleteFromCollection(collectionName, id)
    loadItems()
  }

  return { items, loading, addItem, removeItem, reload: loadItems }
}
