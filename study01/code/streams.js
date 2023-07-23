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

class InvertNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const invertedNumber = parseInt(chunk.toString()) * -1
        callback(null, Buffer.from(String(invertedNumber)))
    }

}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(parseInt(chunk.toString()) * 10)
        callback()
    }
}


new OneToTenStream().pipe(new InvertNumberStream()).pipe(new MultiplyByTenStream())