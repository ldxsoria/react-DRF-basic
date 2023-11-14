import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from  'react-router-dom';
import toast from 'react-hot-toast';

// yup y zod

export function TaskFormPage(){

    const {register, handleSubmit, formState: {errors}, setValue } = useForm();
    
    const navigate = useNavigate();

    const params = useParams();
    console.log(params)
    
    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data);
            toast.success('Tarea actualizada', {
                position: 'bottom-center',
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        } else {
            await createTask(data);
            toast.success('Tarea creada', {
                position: 'bottom-center',
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate('/tasks');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const res = await getTask(params.id);
                console.log(res);
                setValue('title', res.data.title);
                setValue('description', res.data.description)
            }
        }
        loadTask();
    }, []);

    return(
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title" {...register("title", {required: true})} 
                className='bg-zinc-700 text-white p-3 rounded-lg block w-full mb-2'/>
                {errors.title && <span>Campo obligatorio</span>}
                <textarea rows="3" placeholder="Description"  {...register("description", {required: true})} 
                className='bg-zinc-700 text-white p-3 rounded-lg block w-full mb-2'></textarea>
                {errors.description && <span>Campo obligatorio</span>}
                <button
                className='bg-indigo-500 text-white p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button 
            className='bg-red-500 p-3 text-white rounded-lg block w-48 mt-3'
            onClick={ async () => {
                const aceptado = window.confirm("Estas seguro?")
                if (aceptado) {
                    await deleteTask(params.id);
                    toast.success('Tarea eliminada', {
                        position: 'bottom-center',
                        style: {
                            background: "#101010",
                            color: "#fff"
                        }
                    })
                    navigate("/tasks")
                }
            }}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default TaskFormPage