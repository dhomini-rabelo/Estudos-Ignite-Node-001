import { Readable, Writable, Transform } from 'node:stream'

class OneToTenStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i>10) {
                this.push(null)
            } else {
                const buffer = Buffer.from(String(i))
                this.push(buffer)
            }

        }, 1000)
    }
}


// fetch('http://localhost:3334/', {
//     method: 'POST',
//     body: new OneToTenStream(),
//     duplex: 'half',
// }) 

fetch('http://localhost:3334/complete', {
    method: 'POST',
    body: new OneToTenStream(),
    duplex: 'half',
}).then(res => res.text()).then(data => console.log(data))