import sys
import os

# ルートディレクトリをパスに追加して backend フォルダを見えるようにする
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app

# Vercelは "app" という変数を探して実行します
