import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  limit,
  where,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../../firebase.config";

//Obtener todos los objetos
export const getAllObjectsFilter = async (props) => {
//si existe texto filtrar segun el parametro seteado en el code.
if (props.text !== ''){
  const items = await getDocs(
    query(collection(firestore, "objects"), 
    where(props.param, '==', props.text),
    limit(20),
    ),
  
  );
  return items.docs.map((doc) => doc.data()); 

} else {
  //Si no existe texto devuelvo todo los objetos
  const items = await getDocs(
    query(collection(firestore, "objects"), 
    orderBy("id", "asc"), 
    limit(20)),
  );
  return items.docs.map((doc) => doc.data());
}
   
};

//Función para lograr la paginación de los objetos faltantes
export const getAllObjectsFilterMas = async (lastdocument) => {
  const items = await getDocs(
    query(
      collection(firestore, "objects"),
      orderBy("id", "asc"),
      limit(20),
      startAfter(lastdocument)
    )
  );

  return items.docs.map((doc) => doc.data());
};

//Guardar un objeto
export const saveObject = async (data) => {
  await setDoc(doc(firestore, "objects", data.id), data, {
    merge: true,
  });
};
