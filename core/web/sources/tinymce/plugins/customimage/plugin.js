/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.9 (2019-06-26)
 */
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');


    function renderUploadedImage(e) {
        return '<div style="width:100%; background-size: contain; height: 400px;' +
            ' background-repeat: no-repeat; background-position: center center; background-image:url(' + e.target.result + ')">' +
            '</div>';
    }

    function Plugin() {
        global.add('customimage', function (editor) {

            editor.addCommand('mceCustomImage', function () {
                editor.windowManager.open({
                    title: 'Image',
                    size: 'medium',
                    body: {
                        type: 'panel',
                        items: [{
                            type: 'dropzone',
                            name: 'fileinput'
                        }]
                    },
                    buttons: [
                        {
                            type: 'cancel',
                            name: 'cancel',
                            text: 'Cancel'
                        },
                        {
                            type: 'submit',
                            name: 'save',
                            text: 'Save',
                            primary: true
                        }
                    ],
                    onChange: function (api, evt) {
                        if (evt.name === 'fileinput') {
                            var data = api.getData();
                            api.block('Uploading image');

                            var reader = new FileReader();

                            reader.onload = function (e) {
                                console.log(data);
                                api.unblock();
                                api.redial({
                                    title: 'Image',
                                    size: 'normal',
                                    body: {
                                        type: 'panel',
                                        items: [{
                                            type: 'htmlpanel',
                                            html: renderUploadedImage(e)
                                        }]
                                    },
                                    initialData: { data: data },
                                    buttons: [
                                        {
                                            type: 'cancel',
                                            name: 'cancel',
                                            text: 'Cancel'
                                        },
                                        {
                                            type: 'submit',
                                            name: 'save',
                                            text: 'Save',
                                            primary: true
                                        }
                                    ],
                                    onSubmit: function (api) {
                                        api.block('Uploading image');

                                        var formData = new FormData();
                                        formData.append("0", data.fileinput[0]);

                                        var xhr = new XMLHttpRequest();
                                        xhr.onreadystatechange = function (event) {
                                            if (event.target.readyState == 4) {
                                                const data = JSON.parse(event.target.responseText);
                                                editor.insertContent('<img src="' + data[0].url + '"/>');
                                                api.unblock();
                                                api.close();
                                            }
                                        };
                                        xhr.open('POST', '/api/cloudinary/image-upload');
                                        xhr.send(formData);
                                    }
                                })
                            };
                            reader.readAsDataURL(data.fileinput[0]);
                        }
                    },
                });

            });

            editor.ui.registry.addToggleButton('customimage', {
                icon: 'image',
                onAction: function () {
                    return editor.execCommand('mceCustomImage');
                }
            });
        });
    }

    Plugin();

}());
