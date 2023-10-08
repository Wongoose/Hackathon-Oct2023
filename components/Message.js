'use client';
//todo: countdown, allow children
export default function Component({message, text, next, title, type, note}) {
    if (!message && !text) {
        return <h2>...</h2>;
    }
    if (type=='success') {
        <div class="alert alert-success" role="alert">
            { title && <h4 class="alert-heading">{title}</h4> }
            <p>{message?? text}</p>
            {note && <><hr /><p class="mb-0">{note}</p></> }
        </div>    
    }
    return <h2>{message??text}</h2>
}