const updateUser = (user) => {
    console.log(user)
    return {
        type: "UPDATE_USER",
        user 
    }
}
 const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}
 export {
    updateUser,
    removeUser
} 