<template>

    <div class="temas_interes_ctn pa-5 d-flex ga-5 align-center flex-column">
        <div class="title">
            <h2>{{ $t('temasInteres') }}</h2>
        </div>
        <div class="cards_ctn d-flex ga-15">
            <div class="card">
                <div class="img_ctn">
                    <img src="https://via.placeholder.com/150" alt="imagen" />
                </div>
                <div class="contenido_ctn">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores deleniti officiis minima
                        accusamus
                        quia adipisci voluptatem culpa beatae quo fugiat dolorum repellat repudiandae asperiores at,
                        dicta
                        repellendus. Et, voluptate hic!</p>
                </div>
                <div class="tags_ctn ">
                    <div class="tags">
                        <span>Tags:</span>
                        <span>Tag1</span>
                        <span>Tag2</span>
                        <span>Tag3</span>
                    </div>
                    <div class="ver_mas_btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="img_ctn">
                    <img src="https://via.placeholder.com/150" alt="imagen" />
                </div>
                <div class="contenido_ctn">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic blanditiis excepturi soluta! Ipsa
                        nam
                        odit ut officia vero? Rerum magnam esse aspernatur perspiciatis iure distinctio corrupti vel
                        alias
                        recusandae nobis.</p>
                </div>
                <div class="tags_ctn">
                    <div class="tags">
                        <span>Tags:</span>
                        <span>Tag1</span>
                        <span>Tag2</span>
                        <span>Tag3</span>
                    </div>
                    <div class="ver_mas_btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="img_ctn">
                    <img src="https://via.placeholder.com/150" alt="imagen" />
                </div>
                <div class="contenido_ctn">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorem consequuntur
                        consequatur
                        reprehenderit asperiores obcaecati ut placeat a est possimus enim minus quia cum ducimus,
                        similique
                        accusamus. Dolor, tempore quod.</p>
                </div>
                <div class="tags_ctn">
                    <div class="tags">
                        <span>Tags:</span>
                        <span>Tag1</span>
                        <span>Tag2</span>
                        <span>Tag3</span>
                    </div>
                    <div class="ver_mas_btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup></script>

<style scoped>
.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1vw;
    display: flex;
    flex-direction: column;
    gap: 1vw;
    border-radius: 1vw;
}

.card .img_ctn {
    display: flex;
    justify-content: center;

}

.card .img_ctn img {
    width: 22vw;
}

.tags_ctn {
    display: flex;
    justify-content: space-between;
}

.tags_ctn .tags {
    display: flex;
    gap: .5vw;
}

.ver_mas_btn {
    font-weight: 600;

}

button {
    transition: all .3s;
}

.ver_mas_btn button:hover {
    color: #007bff;
}
</style>