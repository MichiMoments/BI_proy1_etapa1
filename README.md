# BI_proy1_etapa1
Proyecto 1 de BI, etapa 1. Realizado por Luis y David

Todos los entregables se encuentran en la wiki, estos elementos eran para nuestro uso.

Aqui están las instrucciones para ejecutarlo.

Primero tenemos que abrir el "main.py" de la carpeta API, y ejecutar dicho archivo.

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/f758e6b1-038b-4ba6-afa2-d69f87ee4cf1)

Ojo, si aparece este error:

![errorcap](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/efebb916-68d3-4f69-a19a-57b546de3cad)

Lo que toca hacer es lo siguiente; Tienen que eliminar el archivo existente de "reviewModel.joblib", posteriormente tienen que ejetucar el cuaderno "proyecto2.ipynb" (completo, tarda unos 15 segundos), este creará de nuevo el .joblib, y ahora tienen que moverlo a la carpeta API.

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/b96ec4da-4620-4272-a7d5-0e7cbd5fe628)


Despues de esto ejecutan en "main.py" de la carpeta API nuevamente, y no debería haber error (recuerden estar dentro de la carpeta de API).

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/79d0677c-4f9f-41d7-bdac-771807085a8b)
Si no hay error asi se debería de ver el proceso completo.

Luego de ejecutar este archivo tienen que correr este comando en la terminal:

```python -m uvicorn main:app --reload```

Y si todo está en orden deberían de ver algo como esto:

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/d4bdd062-d2a0-4a31-8780-217914dcca3c)

Posteriormente (en otra terminal sobre la carpeta principal) tienen que ejecutar este comando:
```npm install react1```

Se debieron agregar estos paquetes:

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/ca5ca338-1571-4633-a3c4-fad36c9637ef)


Luego (estando sobre la carpeta front), hay que ejecutar estos 4 comandos:

```
npm install --save chart.js
npm install --save react-chartjs-2 chart.js
npm i react-router-dom
npm install react-bootstrap bootstrap
```

Y cuando todo se haya instalado, ejecuten este comando:

```npm start```

Inmediatamente despues se les abrirá la página web en el navegador:

![image](https://github.com/MichiMoments/BI_proy1_etapa1/assets/98660771/83343fd2-1c5a-4b9f-a0d7-d71366324090)

Para predecir la clasificación de una palbra se dirigen a la ventana de "predecir".

Y para ver las metricas generales, las metricas por clasificacion, o las palabras con mayur influencia por clasificación, se diregen a la pestaña "metricas."
