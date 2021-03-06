/*
 * Copyright (C) 2016 Álvaro Orduna León
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


function onLoad(baseUrl) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseUrl + '/api/forum/forums',
        data: null,
        success: updateForumSelector
    });
}

function onForumSelected(baseUrl) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseUrl + '/api/forum/subforums',
        data: {"parent": $('#select-forum').val()},
        success: updateSubforumSelector
    });
}

function onSubforumSelected(baseUrl) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: baseUrl + '/api/forum/threads',
        data: {"forum": getSelectionId()},
        success: updateThreadsTable
    });
}

function updateForumSelector(data) {
    var select = document.getElementById('select-forum');

    var option = document.createElement('option');
    option.value = 'none';
    option.innerHTML = 'Ninguno';
    select.appendChild(option);

    for (var i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.value = data[i].id;
        option.innerHTML = data[i].name;

        select.appendChild(option);
    }

    $('#select-forum').change();
}

function updateSubforumSelector(data) {
    var select = document.getElementById('select-subforum');

    $("#select-subforum").find("option").remove();

    var option = document.createElement('option');
    option.value = 'none';
    option.innerHTML = 'Ninguno';
    select.appendChild(option);

    for (var i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.value = data[i].id;
        option.innerHTML = data[i].name;
        select.appendChild(option);
    }

    $('#select-subforum').change();
    updateThreadsTable();
}

function updateThreadsTable(data) {
    var tBody = document.getElementById('table-body');

    if (data === undefined || data.length == 0) {
        $("#table").hide();
        $("#no-threads-msg").show();
    } else {
        var nameStr, row, cell1, cell2, cell3, cell4, cell5, name, author, viewIcon, deleteIcon;

        $("#table-body").find("tr").remove();

        for (var i = 0; i < data.length; i++) {
            nameStr = data[i].name;

            row = tBody.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell4 = row.insertCell(3);
            cell5 = row.insertCell(4);

            cell1.className += "name";
            cell2.className += "date";
            cell3.className += "author";
            cell4.className += "button";
            cell5.className += "button";

            name = document.createElement("a");
            name.innerHTML = data[i].name;
            name.setAttribute("href", "../../thread/" + data[i].id);

            author = document.createElement("a");
            author.innerHTML = data[i].author_id;
            author.setAttribute("href", "../../user/" + data[i].author_id);

            viewIcon = document.createElement("a");
            viewIcon.innerHTML = '<i class="material-icons">visibility</i>';
            viewIcon.setAttribute("href", "../../thread/" + data[i].id);

            deleteIcon = document.createElement("a");
            deleteIcon.innerHTML = '<i class="material-icons">delete</i>';
            deleteIcon.setAttribute("href", "../../thread/delete/" + data[i].id);
            deleteIcon.onclick = function () {
                return confirm('¿Estás seguro de querer eliminar el hilo?');
            };

            cell1.appendChild(name);
            cell2.innerHTML = data[i].time;
            cell3.appendChild(author);
            cell4.appendChild(viewIcon);
            cell5.appendChild(deleteIcon);
        }

        $("#table").show();
        $("#no-threads-msg").hide();
    }
}

function onNewForumClick(baseUrl) {
    $.redirectPost(baseUrl + '/forum/new', {parent: getForumId()});
}

function onNewThreadClick(baseUrl) {
    var forumId = getSelectionId();

    if (forumId != 'none') {
        $.redirectPost(baseUrl + '/thread/new', {forum: getSelectionId()});
    } else {
        alert('Debes elegir un foro o subforo donde añadir el nuevo hilo');
    }
}

function getForumId() {
    return $('#select-forum').val();
}

function getSelectionId() {
    var selectionId = $('#select-subforum').val();

    if (selectionId == 'none') {
        selectionId = $('#select-forum').val()
    }

    return selectionId;
}
