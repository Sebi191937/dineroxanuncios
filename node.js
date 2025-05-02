

const express = require('express'); const mongoose = require('mongoose'); const bodyParser = require('body-parser'); const cors = require('cors'); const app = express();

 Middleware app.use(cors()); app.use(bodyParser.json());

 Conectar a MongoDB mongoose.connect('mongodb+srv://sebasxd1029:643dWhbslkHiAAMH@cluster0.svncyzu.mongodb.net/appAnuncios?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true, });

const UserSchema = new mongoose.Schema({ username: String, password: String, balance: { type: Number, default: 0 } });

const User = mongoose.model('User', UserSchema);

Registro app.post('/register', async (req, res) => { const { username, password } = req.body; const existingUser = await User.findOne({ username }); if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

const user = new User({ username, password });
await user.save();
res.json({ message: 'Usuario registrado exitosamente' });

});

 Login app.post('/login', async (req, res) => { const { username, password } = req.body; const user = await User.findOne({ username, password }); if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

res.json({ message: 'Login exitoso', user: { id: user._id, balance: user.balance } });

});

 Obtener balance app.get('/balance/:id', async (req, res) => { const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ message: 'Usuario no encontrado' }); res.json({ balance: user.balance }); });

 Actualizar balance después de ver anuncio app.post('/reward', async (req, res) => { const { id, reward } = req.body; const user = await User.findById(id); if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

user.balance += reward;
await user.save();
res.json({ message: 'Balance actualizado', newBalance: user.balance });

});

 Iniciar servidor const PORT = process.env.PORT || 3000; app.listen(PORT, () => { console.log(Servidor corriendo en puerto ${PORT}); });
