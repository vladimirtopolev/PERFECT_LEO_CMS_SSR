import * as React from 'react';
import {Component} from 'react';
import * as tinymce from 'tinymce';
import {Editor} from '@tinymce/tinymce-react';

// @ts-ignore
tinymce.baseURL = '/sources/tinymce';


interface EditorProps {
    value?: string,
    onChange?: (value: string) => void
}

interface EditorState {
    content: string
}

export default class EditorComponent extends Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);
        this.state = {
            content: props.value
        }
    }

    onChange = (e: any) => {
        this.props.onChange(e.target.getContent());
    };


    render() {
        return (
            <div>
                <Editor
                    value={this.state.content}
                    init={{
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        removeformat: [
                            {selector: '*', remove: 'all'}
                        ]
                    }}
                    plugins='table textcolor colorpicker link anchor paste customimage autoresize'
                    toolbar={
                        'undo redo | removeformat | bold italic underline strikethrough | subscript superscript | ' +
                        'table  quicklink blockquote | customimage | ' +
                        ' forecolor backcolor forecolorpicker | link anchor |  ' +
                        'alignleft alignright aligncenter alignjustify | ' +
                        'bullist numlist | fullscreen preview'
                    }
                    onChange={this.onChange}/>
            </div>
        );
    }
}
