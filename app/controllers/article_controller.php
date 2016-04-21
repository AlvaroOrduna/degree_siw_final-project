<?php
/**
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

namespace app\controllers;


use App\Core\AbstractController;
use App\Models\Article;
use App\Views\Blog\BlogView;
use App\Views\ErrorView;

class ArticleController extends AbstractController
{
    /**
     * ArticleController constructor.
     * @param $params
     * @throws \Exception
     */
    public function __construct($params)
    {
        $action = '';
        if (isset($params[0])) {
            $action = $params[0];
        }

        switch ($action) {
            case 'new':
                $this->newArticle();
                break;
            case 'edit':
                $this->editArticle($params[1]);
                break;
            default:
                $this->showArticle($params[0]);
                break;
        }
    }

    private function newArticle()
    {
        throw new \Exception('Page to add an article has not been implemented yet', 501);
    }

    private function editArticle($id)
    {
        $id = filter_var($id, FILTER_SANITIZE_STRING);
        if (is_null($article = Article::getById($id))) {
            $this->setView(new ErrorView(404, 'Not found', 'El articulo "' . $id . '" no existe.'));
        } else {
            throw new \Exception('Page to modify an article has not been implemented yet', 501);
        }
    }

    private function showArticle($id)
    {
        $id = filter_var($id, FILTER_SANITIZE_STRING);
        if (is_null($article = Article::getById($id))) {
            $this->setView(new ErrorView(404, 'Not found', 'El articulo "' . $id . '" no existe.'));
        } else {
            throw new \Exception('Page to show an article has not been implemented yet', 501);
        }
    }
}
