import { Router } from 'express';
import { Request, Response } from 'express';
import { authMidd } from '';


const route: Router = Router();

route.get('/', authMidd, (req: Request, res: Response) => {
    return res.end('<h1>Tests</h1>')
})
route.post('/login')
route.post('/register')
route.post('/subscription')
route.post('/edit_user')
route.post('/disconnection_user')
route.post('/add_child')
route.post('/delete_child_import_tutor')
route.post('/list_child')
route.post('/add_bancaire')
route.post('/delete_compte')
route.post('/list_sources_audio')
route.post('/recovery_sources_audio')
route.post('/recovery_facture')

export { route as AuthentificationRoute }