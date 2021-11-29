import LoadingIcon from "../../assets/imgs/Loading_icon.gif";
import './loading.css';

export function Loading(){

    return(
        <div className="imagemCarregando">
          {/*<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Carregando"/> */}
          <img src={LoadingIcon} alt="Carregando"/>
        </div> // gif loading
    );
}