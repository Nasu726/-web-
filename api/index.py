import sys
import os

# 1. 現在のディレクトリ（api/）を取得
current_dir = os.path.dirname(os.path.abspath(__file__))
# 2. 親ディレクトリ（ルート）を取得
parent_dir = os.path.dirname(current_dir)
# 3. backendディレクトリのパスを作成
backend_dir = os.path.join(parent_dir, 'backend')

# ★ここが修正ポイント！
# backendフォルダを検索パスに追加することで、
# "from app.core..." が "backend/app/core..." を見つけられるようにする
sys.path.append(backend_dir)
sys.path.append(parent_dir)

# パスを通した後に main をインポート
from backend.main import app
