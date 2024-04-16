const verifyRole = (...allowedRoles: any[]) => {
	return (req: any, res: any, next: any) => {
		if (!req?.role) return res.sendStatus(401);
		const rolesArray = [...allowedRoles];
		const result = rolesArray.includes(req.role);
		if (!result) return res.sendStatus(401);
		next();
	};
};

export default verifyRole;
