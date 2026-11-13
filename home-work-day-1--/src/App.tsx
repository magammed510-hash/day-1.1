import { useState } from 'react'
import styles from './App.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

let User = [
  { id: 1, 
    foto: "https://media.gettyimages.com/id/2208522191/photo/riyadh-saudi-arabia-cristiano-ronaldo-of-al-nassr-looks-on-during-the-warm-up-prior-to-the.jpg?s=612x612&w=gi&k=20&c=tTGTkgTOKWQlBBNM1t6qEwDG7Mov5njKmBbaDPJCVNA=", 
    name: "Cristiano Ronaldo" },
  { id: 2, 
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4yxjXD0kY-j8vT_ZmYf01lyPURIHGRQkVRSpxkIZBWg&s=10", 
    name: "Mike Tyson" 
  },
   { id: 3, 
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwEZ-lFx4s1exjyGGLlFqwY0V7fWprcZm3H-5k8GFTA&s", 
    name: "Jackie Chan" 
  }
];

function App() {
  const [user, setUser] = useState(User);

  // ADD
  const [name, setName] = useState("");
  const [foto, setFoto] = useState("");
  const [showForm, setShowForm] = useState(false);

  // EDIT
  const [name2, setName2] = useState("");
  const [foto2, setFoto2] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const delUser = (id: number) => { setUser(user.filter(elem => elem.id !== id)) };
  const closeAdd = () => { setName(""); setFoto(""); setShowForm(false); };
  const closeEdit = () => { setEditId(null); setName2(""); setFoto2(""); };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <Fab color="primary" aria-label="add" onClick={() => setShowForm(true)}><AddIcon /></Fab>
      </Box>

      {/* ADD */}
      {showForm && (
        <div className={styles.overlay}>
          <form className={styles.dialog} onSubmit={(e) => { e.preventDefault(); setUser([...user, { id: Date.now(), name: name, foto: foto }]); closeAdd(); }}>
            <h2>Add user</h2>
            <input type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Foto..." value={foto} onChange={(e) => setFoto(e.target.value)} required />
            <div className={styles.btns}>
              <button type="button" className={styles.cancel} onClick={closeAdd}>Cancel</button>
              <button type="submit" className={styles.save}>Save</button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT */}
      {editId !== null && (
        <div className={styles.overlay}>
          <form className={styles.dialog} onSubmit={(e) => { e.preventDefault(); setUser(user.map(elem => elem.id === editId ? { ...elem, name: name2, foto: foto2 } : elem)); closeEdit(); }}>
            <h2>Edit user</h2>
            <input type="text" placeholder="Name..." value={name2} onChange={(e) => setName2(e.target.value)} required />
            <input type="text" placeholder="Foto..." value={foto2} onChange={(e) => setFoto2(e.target.value)} required />
            <div className={styles.btns}>
              <button type="button" className={styles.cancel} onClick={closeEdit}>Cancel</button>
              <button type="submit" className={styles.save}>Save</button>
            </div>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Foto</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((elem, index) => (
            <tr className={styles.box} key={elem.id}>
              <td><h3>{index + 1}</h3></td>
              <td><img className={styles.foto} src={elem.foto} alt="" /></td>
              <td><h2>{elem.name}</h2></td>
              <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => delUser(elem.id)}> Delete </Button>
                  <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => { setEditId(elem.id); setName2(elem.name); setFoto2(elem.foto); }}> Edit </Button>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;