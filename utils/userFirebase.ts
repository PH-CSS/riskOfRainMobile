import { get, onValue, push, ref, remove, set, update } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { Alert } from 'react-native';

type UserFB = {
  id:string;
  name:string;
  cpf: string;
  //Tipo do usuário
}

type AddData = UserFB ;
type SelectData = React.Dispatch<React.SetStateAction<UserFB[]>> | (() => void);
type UpdateData<T = UserFB> = T;
type GetData = string | undefined;
type RemoveData = string;

const useFirebase = (table: 'users' | 'barbers') => {
  if (!dbFB) console.log('dbFb is ', dbFB); //Verifica se o firebase existe
  const listRef = ref(dbFB, table); //seleciona a tabela do firebase

  const addData = async (data: AddData) => {
    const userRef = push(listRef); // Referencia nossa tabela
    console.log('btc');

    try {
      const result = await set(userRef, data); // Adiciona na tabela com um id aleatório data = object
      console.log('addDataResult->', result);
    } catch (err) {
      console.warn(err);
    }
  };

  const removeData = async (cpfDeletable: string) => {
    const user = await getData(cpfDeletable); // Pega usuário a ser deletado


    if (!user) return;
    if (!user[0]) return Alert.alert('Nada', 'Nenhum usuário encontrado');

    const { cpf, name, id } = user[0];
    Alert.alert('Deletar este usuario', `Deletar o usuário?\nCPF:${cpf}\nNome:${name}`, [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Deletar',
        onPress: async () => {
          try {
            await remove(ref(dbFB, `${table}/${id}`)); // remove o usuário
          } catch (err) {
            console.warn(err);
          }
        },
      },
    ]);
  };

  const updateData = async (updates: UserFB) => {
    const data = await getData(updates.cpf); // Manda todo o obj do user e pega os dados dele pelo cpf
    
    console.log('datas->');
    console.log(data);
    if (!data) return;
    console.log(data[0]);
    if (!data[0]) return  Alert.alert('Usuário não existe!');

    const { id } = data[0];
    console.log(table);

    try {
      const result = await update(ref(dbFB, `${table}/${id})`), updates ); // Atualiza os dados (tabela referenciada, dados novos)
      console.log(result);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }

  };
  
  const selectDataListener = (set: SelectData) => {
    const query = onValue(listRef, (snapshot) => {
      const hasData = snapshot.exists();
      if (!hasData) return console.log('não tem data');

      const obj = snapshot.toJSON() as object;
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const newArr = [];
      for (let i = 0; i < keys.length; i++) {
        newArr.push({ id: keys[i], ...values[i] });
      }
      set(newArr);
    });
    return query;
  }; //função que fica executando toda hora só precisa chamala uma vez para funcionar

  const getData = async (id?: GetData ) => {
    try {
      const result = await get(listRef) // Pega os dados da tabela

      const obj = result.toJSON();
      if (obj === null) return [];
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const newArr: UserFB[] = [];
      for (let i = 0; i < keys.length; i++) {
        newArr.push({ id: keys[i], ...values[i] });
      }

      /* 
      Tudo em cima transforma os dados de:
      table: {
        id002: {
          name: "",
          cpf: "",
          email: "",
        }
      }
      em:
      [{id: "id002", name:"", cpf:"", email:"" }]
      */
      if (!id) return newArr; //verifica se tem que filtrar o arr
      const user = newArr.filter(({ cpf }) => cpf === id);
      return user;
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    addData,
    removeData,
    updateData,
    selectDataListener,
    getData,
  };
};

export { useFirebase };