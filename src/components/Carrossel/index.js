import { Carousel } from 'react-carousel-minimal';


export function Carrossel({ dados }){

    const data = [
        {
          image: dados.data.imagemcapa1.url,
         // caption: dados.data.imagemcapa1.url
        },
        {
            image: dados.data.imagemcapa2.url,
         //   caption: dados.data.imagemcapa2.url
        },
        {
            image: dados.data.imagemcapa3.url,
        //    caption: dados.data.imagemcapa3.url
        }
      ];

      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }


    return  <Carousel
    data={data}
    time={2000}
    width="850px"
    height="500px"
    captionStyle={captionStyle}
    radius="10px"
    slideNumber={true}
    slideNumberStyle={slideNumberStyle}
    captionPosition="bottom"
    automatic={true}
    dots={true}
    pauseIconColor="white"
    pauseIconSize="40px"
    slideBackgroundColor="darkgrey"
    slideImageFit="cover"
    thumbnails={false}
    thumbnailWidth="100px"
    style={{
      textAlign: "center",
      maxWidth: "850px",
      maxHeight: "500px",
      margin: "40px auto",
    }}
  />
}
