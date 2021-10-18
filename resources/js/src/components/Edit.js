import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import AppContainer from './AppContainer'
import api from '../api'

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [completed,setCompleted] = useState(false);

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateTask({
                name,description,completed
            },id)
            history.push('/');
        }
        catch (e) {
            alert('error al editar la tarea')
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        api.getOneTask(id).then(res => {
            const result = res.data
            const task = result.data
            setName(task.name);
            setDescription(task.description);
            setCompleted(task.completed);
        })
    },[]);

    return (
        <AppContainer
            title='EDITAR TAREA'
        >
            <form>
                <div className='form-group'>
                    <label>Nombre de la tarea</label>
                    <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label>Descripción de la tarea</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className='form-check'>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        defaultChecked={completed ? "true" : "false"}
                        onChange={e => setCompleted(e.target.checked)} />
                    <label className="form-check-label">Tarea completada</label>
                </div>

                <div className='form-group mt-4'>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={onEditSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Editar'}

                    </button>

                </div>

            </form>
        </AppContainer>
    );
};

export default Edit;
