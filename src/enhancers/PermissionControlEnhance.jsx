import Permission from 'permission'
export default (userPermission,moduleName) => {
	return Component => {
		return Permission.hasPermission(userPermission,moduleName)?Component:null
	}
}
