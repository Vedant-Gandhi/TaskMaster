import style from './Home.module.css';
import Button from 'components/stateless/Button/Button';
import All from './sections/All';

function Home() {
    return (
        <main className={style.homeRoot}>
            <div className={style.topBar}>
                <Button isDelete>
                    <i className="bx bx-alarm-exclamation" style={{ color: '#ffffff' }}></i>Delete
                    Expired
                </Button>
            </div>
            <All></All>
        </main>
    );
}

export default Home;
