import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import AppContainer from './AppContainer'
import api from '../api'

const Add = () => {
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [completed,setCompleted] = useState(false);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addTask({
                name,description,completed
            })
            history.push('/');
        }
        catch (e) {
            alert('error al registrar la tarea')
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer
            title='AGREGAR NUEVA TAREA'
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
                    <input type="checkbox" className="form-check-input" value={completed} onChange={e => setCompleted(e.target.checked)} />
                    <label className="form-check-label">Tarea completada</label>
                </div>

                <div className='form-group mt-4'>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={onAddSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Agregar'}

                    </button>

                </div>

            </form>
        </AppContainer>
    );
};

export default Add;
