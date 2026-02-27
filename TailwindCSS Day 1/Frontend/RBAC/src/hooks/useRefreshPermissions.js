import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePermissions } from '../redux/slices/authSlice'
import permissionService from '../services/permissionService'

export function useRefreshPermissions(){
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector((state)=>state.auth)
    const refresh = async()=>{
        if(!isAuthenticated || !user) return
        try{
            const freshData = await permissionService.getByRole(user.roleId)
            dispatch(updatePermissions(freshData))
        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        refresh()
        //this will be called when user switch back to this tab
        window.addEventListener('focus', refresh)
        return()=>window.removeEventListener('focus', refresh)
    }, [isAuthenticated, user?.roleId])
}