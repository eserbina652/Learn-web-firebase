import React, {useEffect, useState} from 'react';
import Auth from "./components/auth";
import {db, auth, storage} from "./configs/firebase";
import {getDocs, collection, addDoc, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import {ref, uploadBytes} from 'firebase/storage'
import './App.css'

const App = () => {
    const [movieList, setMovieList] = useState([])

    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

    const [updatedTitle, setUpdatedTitle] = useState('')

    const [fileUpload, setFileUpload] = useState(null)

    const movieCollectonRef = collection(db, 'moovies')

    const securityAlert = () => alert('You must be logged in')
    const getMovieList = async () => {
        try {
            const data = await getDocs(movieCollectonRef)
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setMovieList(filteredData)
        } catch (e) {
            console.log('get moovie list err', e)
        }
    }

    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectonRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAndOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid
            })
            getMovieList()
        } catch (e) {
            console.log('SubmitMovie Err', e)
        }
    }

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, 'moovies', id)
        try {
            await deleteDoc(movieDoc)
            getMovieList()
        } catch (e) {
            console.log('Delete error because of logged out', e)
            // securityAlert()
        }
    }
    const updateTitle = async (id) => {
        const movieDoc = doc(db, 'moovies', id)
        try {
            await updateDoc(movieDoc, {title: updatedTitle})
            getMovieList()

        } catch (e) {
            // securityAlert()
            console.log('Update title error because of logged out', e)
        }
    }

    const uplloadFile = async () => {
        if (!fileUpload) return
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
        try {
            await uploadBytes(filesFolderRef, fileUpload)
        } catch (e) {
            console.log('Upload file error because of logged out', e)
        }
    }

    useEffect(() => {
        getMovieList()
    }, [onSubmitMovie]);

    return (
        <div className={'App'}>
            <Auth/>

            <div>
                <input placeholder={'Movie title...'} onChange={e => setNewMovieTitle(e.target.value)}/>
                <input placeholder={'Release date...'} type="number"
                       onChange={e => setNewReleaseDate(Number(e.target.value))}/>
                <input type="checkbox" checked={isNewMovieOscar} onChange={e => setIsNewMovieOscar(e.target.checked)}/>
                <label>Received and Oscar</label>
                <button onClick={onSubmitMovie}>Submit movie</button>
            </div>
            <div>{
                movieList.map((movie, i) => (
                    <div key={i.toString()}>
                        <h1 style={{color: movie.receivedAndOscar ? 'green' : 'red'}}>{movie.title}</h1>
                        <p>Date: {movie.releaseDate}</p>

                        <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

                        <input placeholder={'New title...'} onChange={e => setUpdatedTitle(e.target.value)}/>
                        <button onClick={() => updateTitle(movie.id)}>Update title</button>
                    </div>
                ))
            }</div>

            <div>
                <input
                    type="file"
                    onChange={e => setFileUpload(e.target.files[0])}/>
                <button onClick={uplloadFile}>Upload file</button>
            </div>
        </div>
    );
};

export default App;
