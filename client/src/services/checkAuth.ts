const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user')!)
    return !!user
}

export default checkAuth